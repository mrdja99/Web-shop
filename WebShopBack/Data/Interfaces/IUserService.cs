using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Entities;
using Data.Models;

namespace Data.Interfaces
{
    public interface IUserService
    {
        Task<User> GetUser(int userId);
        Task<User> Login(string username);
        Task<bool> AddUser(RegisterDTO user);
        Task<bool> UpdateUser(int userId, RegisterDTO user);
    }
}