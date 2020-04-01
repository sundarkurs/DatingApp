using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public IAuthRepository _repo { get; }
        public AuthController(IAuthRepository repo)
        {
            _repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower().Trim();
            if(await _repo.UserExists(userForRegisterDto.Username)){
                return BadRequest("Username already exists.");
            }

            var userrToRegister = new User(){
                Username = userForRegisterDto.Username
            };

            var userCreated = _repo.Register(userrToRegister, userForRegisterDto.Password);
            return StatusCode(201);
        }
    }
}