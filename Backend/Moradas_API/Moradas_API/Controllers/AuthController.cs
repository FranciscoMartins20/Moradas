using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Moradas_API.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Moradas_API.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public AuthController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }
        /// <summary>
        /// Este método serve para o registo de um utilizador.
        /// </summary>
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto request)
        {
            var user = new User
            {
                UserName = request.email,
                Email = request.email
            };

            var result = await _userManager.CreateAsync(user, request.password);

            if (result.Succeeded)
            {
                
                var token = CreateToken(user);
                return Ok(new { Token = token });
            }
            else
            {
                // Registro falhou, retorne os erros
                return BadRequest(result.Errors);
            }
        }
        /// <summary>
        /// Este método serve para fazer login de um utilizador já criado.
        /// </summary>
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto request)
        {
            var user = await _userManager.FindByEmailAsync(request.email);

            if (user == null)
            {
                return BadRequest("Email não encontrado.");
            }

            var result = await _signInManager.PasswordSignInAsync(user, request.password, false, false);

            if (result.Succeeded)
            {
                var token = CreateToken(user);
                return Ok(new { Token = token });
            }
            else
            {
                return BadRequest("Palavra-Passe Incorreta");
            }
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JwtSettings:Token").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(1);

            var token = new JwtSecurityToken(
                _configuration["JwtSettings:Issuer"],
                _configuration["JwtSettings:Issuer"],
                claims,
                expires: expires,
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
