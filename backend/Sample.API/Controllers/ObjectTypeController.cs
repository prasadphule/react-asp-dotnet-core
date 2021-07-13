using Microsoft.AspNetCore.Mvc;
using Sample.Data.Repository;
using Sample.Entity;
using System;
using System.Collections.Generic;

namespace Sample.API.Controllers
{
    public class ObjectTypeController : CustomBaseController
    {
        private readonly IObjectTypeRepository _objectTypeRepository;

        public ObjectTypeController(IObjectTypeRepository objectTypeRepository)
            => _objectTypeRepository = objectTypeRepository;

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var objectTypes = _objectTypeRepository.GetAll();
                if (objectTypes == null)
                {
                    return NotFound();
                }

                return Ok(objectTypes);
            }
            catch (Exception)
            {
                return BadRequest();
            }

        }

        [HttpGet(id)]
        public IActionResult Get(int? id)
        {
            if (id == null)
                return BadRequest();

            try
            {
                var objectType = _objectTypeRepository.Get(id);

                if (objectType == null)
                    return NotFound();

                return Ok(objectType);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] ObjectType objectType)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    var savedObjectType = _objectTypeRepository.Save(objectType);
                    if (savedObjectType.ObjectTypeId > 0)
                        return Ok(savedObjectType);
                    else
                        return NotFound();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPut(id)]
        public IActionResult Put(int id, [FromBody] ObjectType objectType)
        {
            if (ModelState.IsValid)
            {
                if (id != objectType.ObjectTypeId)
                    return BadRequest();

                try
                {
                    _objectTypeRepository.Update(objectType);
                    return NoContent();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return BadRequest(ModelState);
        }

        [HttpDelete(id)]
        public IActionResult Delete(int? id)
        {
            if (id == null || id <= 0)
                return BadRequest();

            try
            {
                bool result = _objectTypeRepository.Delete(id);
                if (result)
                    return NotFound();

                return NoContent();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

    }
}
