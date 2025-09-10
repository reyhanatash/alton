using Alton.API.Application.DTOs.Codes;
using Alton.API.Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Alton.API.WebApi.Controllers
{
    [Route("api/code")]
    [ApiController]


    public class CodeController : Controller
    {
        private readonly ICodeService _code;
        public CodeController(ICodeService svc) => _code = svc;

        [HttpGet("getCodes")]
        [Authorize]
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
        [Authorize(Roles ="Admin")]
        public async Task<long> GenerateCode(CreateCodeDto model)
        {
            try
            {
                long code = await _code.GenerateCodeAsync(model);
                return code;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("assignCode")]
        [Authorize(Roles = "Admin")]
        public async Task AssignCode(AssignCodeDto model)
        {
            try
            {
                await _code.AssignCodeAsync(model);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
