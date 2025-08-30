using Alton.API.Application.DTOs.Codes;
using Alton.API.Application.DTOs.Users;
using Alton.API.Core.Entities;
using Alton.API.Core.Interfaces;
using Alton.API.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Alton.API.Application.Services
{
    public class CodeService : ICodeService
    {
        private readonly AppDbContext _context;

        public CodeService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<CodeDto>> GetCodesAsync() =>
            (await _context.Codes.AsNoTracking().ToListAsync()).Select(u => new CodeDto
            {
                Id = u.Id,
                CodeType = u.CodeType,
                CreateDate = u.CreateDate,
                IdTemp = u.IdTemp,
                UserId = u.UserId
            });

        public async Task GenerateCodeAsync(CreateCodeDto model)
        {
            try
            {
                switch (model.CodeType)
                {
                    case 1:
                        model.IdTemp = ((model.IdTemp + 7777) / 797) - 7777;
                        break;
                    case 2:
                        model.IdTemp = ((model.IdTemp + 7777) / 780) - 7777;
                        break;
                    case 3:
                        model.IdTemp = ((model.IdTemp + 7777) / 784) - 7777;
                        break;
                    case 4:
                        model.IdTemp = ((model.IdTemp + 7777) / 770) - 7777;
                        break;
                    case 5:
                        model.IdTemp = ((model.IdTemp + 7777) / 877) - 7777;
                        break;
                    case 6:
                        model.IdTemp = ((model.IdTemp + 7777) / 788) - 7777;
                        break;
                }

                var code = new CodeContext
                {
                    CodeType = model.CodeType,
                    CreateDate = DateTime.UtcNow,
                    Id = model.Id,
                    IdTemp = model.IdTemp,
                    UserId = -1
                };

                _context.Codes.Add(code);
                await _context.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
