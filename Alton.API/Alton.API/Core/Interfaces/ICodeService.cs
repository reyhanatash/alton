using Alton.API.Application.DTOs.Codes;

namespace Alton.API.Core.Interfaces
{
    public interface ICodeService
    {
        Task<IEnumerable<CodeDto>> GetCodesAsync();
        Task GenerateCodeAsync(CreateCodeDto model);

    }
}
