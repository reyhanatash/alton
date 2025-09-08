using Alton.API.Application.DTOs.Codes;

namespace Alton.API.Core.Interfaces
{
    public interface ICodeService
    {
        Task<IEnumerable<CodeDto>> GetCodesAsync();
        Task<long> GenerateCodeAsync(CreateCodeDto model);
        Task AssignCodeAsync(AssignCodeDto model);

    }
}