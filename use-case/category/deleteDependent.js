const response = require('../../utils/response');

const getDependencyCount = ({
  categoryDb,productDb
})=> async (filter) =>{
  let category = await categoryDb.findMany(filter);
  if (category.length){
    let categoryIds = category.map((obj) => obj.id);

    const productFilter = { '$or': [{ category_id : { '$in' : categoryIds } }] };
    const productCnt =  await productDb.count(productFilter);
    let result = { product :productCnt , };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  category : 0 }
    });
  }
};

const deleteWithDependency = ({
  categoryDb,productDb
})=> async (filter) =>{
  let category = await categoryDb.findMany(filter);
  if (category.length){
    let categoryIds = category.map((obj) => obj.id);

    const productFilter = { '$or': [{ category_id : { '$in' : categoryIds } }] };
    const productCnt =  (await productDb.deleteMany(productFilter));
    let deleted = (await categoryDb.deleteMany(filter));
    let result = { product :productCnt , };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  category : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  categoryDb,productDb
}) => async (filter,updateBody) =>{
  let category = await categoryDb.findMany(filter);
  if (category.length){
    let categoryIds = category.map((obj) => obj.id);

    const productFilter = { '$or': [{ category_id : { '$in' : categoryIds } }] };
    const productCnt =  (await productDb.updateMany(productFilter,updateBody));
    let updated = (await categoryDb.updateMany(filter,updateBody));
    let result = { product :productCnt , };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  category : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
