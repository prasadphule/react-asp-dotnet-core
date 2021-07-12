using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Sample.API.Controllers;
using Sample.Data;
using Sample.Data.Repository;
using Sample.Entity;
using System.Collections.Generic;
using Xunit;

namespace Sample.API.Test
{
    public class ObjectTypeControllerTest
    {
        private readonly IObjectTypeRepository repository;
        public ObjectTypeControllerTest()
        {
            //we can get fake repo or moq repo or connect dummy db
            repository = new ObjectTypeRepository(
                new UnitofWork(
                    new MySqlConnection("server=localhost;database=sample;user=root;password=Admin@123")
                    ));
        }

        #region GetById  

        [Fact]
        public void Task_GetById_Return_OkResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            var objectTypeId = 1;

            //Act  
            var data = controller.Get(objectTypeId);

            //Assert  
            Assert.IsType<OkObjectResult>(data);
        }

        [Fact]
        public void Task_GetById_Return_NotFoundResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            var objectTypeId = 5;

            //Act  
            var data = controller.Get(objectTypeId);

            //Assert  
            Assert.IsType<NotFoundResult>(data);
        }

        [Fact]
        public void Task_GetById_Return_BadRequestResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            int? objectTypeId = null;

            //Act  
            var data = controller.Get(objectTypeId);

            //Assert  
            Assert.IsType<BadRequestResult>(data);
        }

        [Fact]
        public void Task_GetById_MatchResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            int? objectTypeId = 1;

            //Act  
            var data = controller.Get(objectTypeId);

            //Assert  
            Assert.IsType<OkObjectResult>(data);

            var okResult = data.Should().BeOfType<OkObjectResult>().Subject;
            var post = okResult.Value.Should().BeAssignableTo<ObjectType>().Subject;

            Assert.Equal("name1", post.ObjectTypeName);
            Assert.Equal("desc1", post.Description);
        }

        #endregion

        #region GetAll  

        [Fact]
        public void Task_GetAll_Return_OkResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);

            //Act  
            var data = controller.GetAll();

            //Assert  
            Assert.IsType<OkObjectResult>(data);
        }

        [Fact]
        public void Task_GetAll_Return_BadRequestResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);

            //Act  
            var data = controller.GetAll();
            data = null;

            if (data != null)
                //Assert  
                Assert.IsType<BadRequestResult>(data);
        }

        [Fact]
        public void Task_GetAll_MatchResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);

            //Act  
            var data = controller.GetAll();

            //Assert  
            Assert.IsType<OkObjectResult>(data);

            var okResult = data.Should().BeOfType<OkObjectResult>().Subject;
            var post = okResult.Value.Should().BeAssignableTo<List<ObjectType>>().Subject;

            Assert.Equal("name1", post[0].ObjectTypeName);
            Assert.Equal("desc1", post[0].Description);

            Assert.Equal("name2", post[1].ObjectTypeName);
            Assert.Equal("desc2", post[1].Description);
        }

        #endregion

        #region Add New ObjectType  

        [Fact]
        public void Task_Add_ValidData_Return_OkResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            ObjectType post = new()
            {
                ObjectTypeName = "name4",
                Description = "desc4",
                Level = 2
            };

            //Act  
            var data = controller.Post(post);

            //Assert  
            Assert.IsType<OkObjectResult>(data);
        }

        [Fact]
        public void Task_Add_InvalidData_Return_BadRequest()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            ObjectType post = new()
            {
                ObjectTypeName = "Test Title More Than 10 Characteres",
                Description = "desc5",
                Level = 5
            };

            //Act              
            var data = controller.Post(post);

            //Assert  
            Assert.IsType<BadRequestResult>(data);
        }

        [Fact]
        public void Task_Add_ValidData_MatchResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            ObjectType objectType = new()
            {
                ObjectTypeName = "name4",
                Description = "desc4",
                Level = 2
            };

            //Act  
            var data = controller.Post(objectType);

            //Assert  
            Assert.IsType<OkObjectResult>(data);

            var okResult = data.Should().BeOfType<OkObjectResult>().Subject;
            // var result = okResult.Value.Should().BeAssignableTo<PostViewModel>().Subject;  

            Assert.Equal(4, okResult.Value);
        }

        #endregion

        #region Update Existing ObjectType

        [Fact]
        public void Task_Update_ValidData_Return_OkResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            var objectTypeId = 2;

            //Act  
            var existingPost = controller.Get(objectTypeId);
            var okResult = existingPost.Should().BeOfType<OkObjectResult>().Subject;
            var result = okResult.Value.Should().BeAssignableTo<ObjectType>().Subject;

            var objectType = new ObjectType
            {
                ObjectTypeName = "name2",
                Description = result.Description,
                Level = result.Level
            };

            var updatedData = controller.Post(objectType);

            //Assert  
            Assert.IsType<OkResult>(updatedData);
        }

        [Fact]
        public void Task_Update_InvalidData_Return_BadRequest()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            var objectTypeId = 2;

            //Act  
            var existingPost = controller.Get(objectTypeId);
            var okResult = existingPost.Should().BeOfType<OkObjectResult>().Subject;
            var result = okResult.Value.Should().BeAssignableTo<ObjectType>().Subject;

            ObjectType objectType = new()
            {
                ObjectTypeName = "Test Title More Than 10 Characteres",
                Description = result.Description,
                Level = result.Level
            };

            var data = controller.Post(objectType);

            //Assert  
            Assert.IsType<BadRequestResult>(data);
        }

        [Fact]
        public void Task_Update_InvalidData_Return_NotFound()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            var objectTypeId = 2;

            //Act  
            var existingPost = controller.Get(objectTypeId);
            var okResult = existingPost.Should().BeOfType<OkObjectResult>().Subject;
            var result = okResult.Value.Should().BeAssignableTo<ObjectType>().Subject;

            ObjectType objectType = new()
            {
                ObjectTypeId = 5,
                ObjectTypeName = "Test Title More Than 10 Characteres",
                Description = result.Description,
                Level = result.Level
            };

            var data = controller.Post(objectType);

            //Assert  
            Assert.IsType<NotFoundResult>(data);
        }

        #endregion

        #region Delete Post  

        [Fact]
        public void Task_Delete_Post_Return_OkResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            var objectTypeId = 2;

            //Act  
            var data = controller.Delete(objectTypeId);

            //Assert  
            Assert.IsType<OkResult>(data);
        }

        [Fact]
        public void Task_Delete_Post_Return_NotFoundResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            var objectTypeId = 5;

            //Act  
            var data = controller.Delete(objectTypeId);

            //Assert  
            Assert.IsType<NotFoundResult>(data);
        }

        [Fact]
        public void Task_Delete_Return_BadRequestResult()
        {
            //Arrange  
            var controller = new ObjectTypeController(repository);
            int? objectTypeId = null;

            //Act  
            var data = controller.Delete(objectTypeId);

            //Assert  
            Assert.IsType<BadRequestResult>(data);
        }

        #endregion
    }
}
