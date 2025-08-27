using Alton.API.Core.Interfaces;
using Alton.API.Application.JwtAuth.Helpers;
using Alton.API.Core.Entities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Alton.Api.Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly JwtSettings _settings;
        public TokenService(IOptions<JwtSettings> opts) => _settings = opts.Value;

        public string CreateToken(UserContext user, string roleName)
        {
            var claims = new[]
            {
                new Claim("userId", user.Id.ToString()),
                new Claim("username", user.Username ?? ""),
                new Claim("role", roleName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _settings.Issuer,
                _settings.Audience,
                claims,
                expires: DateTime.UtcNow.AddDays(_settings.ExpireDays),
                signingCredentials: creds
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
