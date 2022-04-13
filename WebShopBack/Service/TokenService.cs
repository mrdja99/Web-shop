using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Data.Entities;
using Data.Interfaces;
using Data.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }
        public string CreateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["AppSettings:Secret"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Role, user.Role.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }

        public AuthenticationResponse CreateResponse(string tokenString, User user, string password)
        {
            AuthenticationResponse response = new AuthenticationResponse();
            response.Email = user.Email;
            response.Id = user.UserId;
            response.Token = tokenString;
            response.Username = user.Username;
            response.Password = password;
            response.IsAdmin = user.IsAdmin;
            response.Role = user.Role;
            response.FirstName = user.FirstName;
            response.LastName = user.LastName;
            response.Phone = user.Phone;
            response.Image = user.Image;
            return response;
        }
    }
}