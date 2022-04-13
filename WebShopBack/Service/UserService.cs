using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Data;
using Data.Entities;
using Data.Interfaces;
using Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;

        }
        public async Task<bool> AddUser(RegisterDTO user)
        {
            try
            {
                if (UserExists(user.Username)) return false; // Korisinik vec postoji pa vracamo false

                using var hmac = new HMACSHA512();

                var newUser = new User
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Phone = user.Phone,
                    Email = user.Email,
                    Username = user.Username,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password)),
                    PasswordSalt = hmac.Key,
                    IsAdmin = user.IsAdmin,
                    Role = user.Role,
                    Image = user?.Image
                };

                _context.Add(newUser);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private bool UserExists(string username)
        {
            return _context.Users.Any(user => user.Username == username);
        }

        public async Task<User> Login(string username)
        {
            try
            {
                var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == username);

                return user;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<User> GetUser(int userId)
        {
            try
            {
                return await _context.Users.Where(u => u.UserId == userId).SingleOrDefaultAsync();
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<bool> UpdateUser(int userId, RegisterDTO user)
        {
            try
            {
                using var hmac = new HMACSHA512();
                
                _context.Users.Update(new User
                {
                    UserId = userId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Phone = user.Phone,
                    Email = user.Email,
                    Username = user.Username,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password)),
                    PasswordSalt = hmac.Key,
                    IsAdmin = user.IsAdmin,
                    Role = user.Role,
                    Image = user?.Image
                });

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }
    }
}