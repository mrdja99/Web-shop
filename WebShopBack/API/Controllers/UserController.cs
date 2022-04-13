using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Helpers;
using Data.Entities;
using Data.Interfaces;
using Data.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;

        public UserController(IUserService userService, ITokenService tokenService)
        {
            _userService = userService;
            _tokenService = tokenService;
        }

        // POST: api/user/register
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(RegisterDTO user)
        {
            if (await _userService.AddUser(user)) return Ok(user);
            return NotFound();
        }

        // POST: api/user/login
        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login(AuthenticationRequest request)
        {
            var user = await _userService.Login(request.Username);

            if (user == null) return Unauthorized("Invalid username");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }

            var tokenString = _tokenService.CreateToken(user);
            AuthenticationResponse response = _tokenService.CreateResponse(tokenString, user, request.Password);
            return Ok(response);
        }

        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, [FromBody] RegisterDTO user)
        {
            if (await _userService.UpdateUser(id, user)) return Ok(user);
            return BadRequest();
        }
    }
}