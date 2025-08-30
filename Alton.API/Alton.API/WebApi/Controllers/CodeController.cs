using Alton.API.Application.DTOs.Codes;
using Alton.API.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Alton.API.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class CodeController : Controller
    {
        private readonly ICodeService _code;
        public CodeController(ICodeService svc) => _code = svc;

        [HttpGet("getCodes")]
        public async Task<IEnumerable<CodeDto>> GetCodes()
        {
            try
            {
                var result = await _code.GetCodesAsync();

                return result;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("generateCode")]
        public async Task GenerateCode(CreateCodeDto model)
        {
            try
            {
                await _code.GenerateCodeAsync(model);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
