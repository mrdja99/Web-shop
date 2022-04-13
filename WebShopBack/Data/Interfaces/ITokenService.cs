using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Entities;
using Data.Models;

namespace Data.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
        AuthenticationResponse CreateResponse(string tokenString, User user, string password);
    }
}