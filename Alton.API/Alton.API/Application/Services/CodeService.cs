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
        private readonly IReadTokenClaims _token;

        public CodeService(AppDbContext context, IReadTokenClaims token)
        {
            _context = context;
            _token = token;
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

        public async Task<long> GenerateCodeAsync(CreateCodeDto model)
        {
            try
            {
                int userId = _token.GetUserId();

                var items = await _context.Codes.AsNoTracking()
                .Where(c => userId == c.UserId)
                .ToListAsync();

                var userAssign = await _context.UserAssignments.FirstOrDefaultAsync(user => user.UserId == userId);

                if (userAssign != null)
                {
                    if (userAssign.Count < items.ToList().Count)
                    {
                        throw new Exception("Your limit is reached!");
                    }
                }
                long generatedCode = 0;
                switch (model.CodeType)
                {
                    case 1:
                        generatedCode = ((model.IdTemp + 7777) / 797) - 7777;
                        break;
                    case 2:
                        generatedCode = ((model.IdTemp + 7777) / 780) - 7777;
                        break;
                    case 3:
                        generatedCode = ((model.IdTemp + 7777) / 784) - 7777;
                        break;
                    case 4:
                        generatedCode = ((model.IdTemp + 7777) / 770) - 7777;
                        break;
                    case 5:
                        generatedCode = ((model.IdTemp + 7777) / 877) - 7777;
                        break;
                    case 6:
                        generatedCode = ((model.IdTemp + 7777) / 788) - 7777;
                        break;
                }

                var code = new CodeContext
                {
                    CodeType = model.CodeType,
                    CreateDate = DateTime.Now,
                    IdTemp = model.IdTemp,
                    UserId = userId,
                    GeneratedCode = generatedCode
                };

                _context.Codes.Add(code);
                await _context.SaveChangesAsync();


                var codeHistory = new CodeHistoryContext
                {
                    CodeType = model.CodeType,
                    CreateDate = DateTime.Now,
                    IdTemp = model.IdTemp,
                    UserId = userId,
                    GeneratedCode = generatedCode
                };
                _context.CodeHistories.Add(codeHistory);
                await _context.SaveChangesAsync();
                return generatedCode;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task AssignCodeAsync(AssignCodeDto model)
        {
            try
            {
                var user = await _context.UserAssignments.FirstOrDefaultAsync(u => u.UserId == model.UserId);

                if (user != null)
                {
                    // log assignhaye ghabli bayad bemoone ya update beshe per user?
                    user.AssignDate = DateTime.Now;
                    user.Count = model.Count;
                    user.UserId = user.UserId;
                    _context.UserAssignments.Update(user);
                }
                else
                {
                    var assign = new UserAssignmentContext
                    {
                        AssignDate = DateTime.Now,
                        Count = model.Count,
                        UserId = model.UserId
                    };

                    _context.UserAssignments.Add(assign);
                }
                await _context.SaveChangesAsync();


                var items = await _context.Codes.AsNoTracking()
                    .Where(c => model.UserId == c.UserId)
                    .ToListAsync();

                _context.Codes.RemoveRange(items);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
