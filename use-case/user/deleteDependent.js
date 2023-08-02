const response = require('../../utils/response');

const getDependencyCount = ({
  userDb,productDb,categoryDb,userTokensDb,roleDb,projectRouteDb,routeRoleDb,userRoleDb
})=> async (filter) =>{
  let user = await userDb.findMany(filter);
  if (user.length){
    let userIds = user.map((obj) => obj.id);

    const productFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const productCnt =  await productDb.count(productFilter);

    const categoryFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const categoryCnt =  await categoryDb.count(categoryFilter);

    const userFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userCnt =  await userDb.count(userFilter);

    const userTokensFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userTokensCnt =  await userTokensDb.count(userTokensFilter);

    const roleFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const roleCnt =  await roleDb.count(roleFilter);

    const projectRouteFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const projectRouteCnt =  await projectRouteDb.count(projectRouteFilter);

    const routeRoleFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const routeRoleCnt =  await routeRoleDb.count(routeRoleFilter);

    const userRoleFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userRoleCnt =  await userRoleDb.count(userRoleFilter);
    let result = {
      product :productCnt ,
      category :categoryCnt ,
      user :userCnt + 1,
      userTokens :userTokensCnt ,
      role :roleCnt ,
      projectRoute :projectRouteCnt ,
      routeRole :routeRoleCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  user : 0 }
    });
  }
};

const deleteWithDependency = ({
  userDb,productDb,categoryDb,userTokensDb,roleDb,projectRouteDb,routeRoleDb,userRoleDb
})=> async (filter) =>{
  let user = await userDb.findMany(filter);
  if (user.length){
    let userIds = user.map((obj) => obj.id);

    const productFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const productCnt =  (await productDb.deleteMany(productFilter));

    const categoryFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const categoryCnt =  (await categoryDb.deleteMany(categoryFilter));

    const userFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userCnt =  (await userDb.deleteMany(userFilter));

    const userTokensFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userTokensCnt =  (await userTokensDb.deleteMany(userTokensFilter));

    const roleFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const roleCnt =  (await roleDb.deleteMany(roleFilter));

    const projectRouteFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const projectRouteCnt =  (await projectRouteDb.deleteMany(projectRouteFilter));

    const routeRoleFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const routeRoleCnt =  (await routeRoleDb.deleteMany(routeRoleFilter));

    const userRoleFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userRoleCnt =  (await userRoleDb.deleteMany(userRoleFilter));
    let deleted = (await userDb.deleteMany(filter));
    let result = {
      product :productCnt ,
      category :categoryCnt ,
      user :userCnt + deleted,
      userTokens :userTokensCnt ,
      role :roleCnt ,
      projectRoute :projectRouteCnt ,
      routeRole :routeRoleCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  user : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  userDb,productDb,categoryDb,userTokensDb,roleDb,projectRouteDb,routeRoleDb,userRoleDb
}) => async (filter,updateBody) =>{
  let user = await userDb.findMany(filter);
  if (user.length){
    let userIds = user.map((obj) => obj.id);

    const productFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const productCnt =  (await productDb.updateMany(productFilter,updateBody));

    const categoryFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const categoryCnt =  (await categoryDb.updateMany(categoryFilter,updateBody));

    const userFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userCnt =  (await userDb.updateMany(userFilter,updateBody));

    const userTokensFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userTokensCnt =  (await userTokensDb.updateMany(userTokensFilter,updateBody));

    const roleFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const roleCnt =  (await roleDb.updateMany(roleFilter,updateBody));

    const projectRouteFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const projectRouteCnt =  (await projectRouteDb.updateMany(projectRouteFilter,updateBody));

    const routeRoleFilter = { '$or': [{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const routeRoleCnt =  (await routeRoleDb.updateMany(routeRoleFilter,updateBody));

    const userRoleFilter = { '$or': [{ userId : { '$in' : userIds } },{ addedBy : { '$in' : userIds } },{ updatedBy : { '$in' : userIds } }] };
    const userRoleCnt =  (await userRoleDb.updateMany(userRoleFilter,updateBody));
    let updated = (await userDb.updateMany(filter,updateBody));
    let result = {
      product :productCnt ,
      category :categoryCnt ,
      user :userCnt + updated,
      userTokens :userTokensCnt ,
      role :roleCnt ,
      projectRoute :projectRouteCnt ,
      routeRole :routeRoleCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  user : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
