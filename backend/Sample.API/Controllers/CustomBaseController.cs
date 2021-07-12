using Microsoft.AspNetCore.Mvc;

namespace Sample.API.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class CustomBaseController : ControllerBase
    {
        protected const string id = "{id}";
    }
}
