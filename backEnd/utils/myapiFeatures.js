class myQueryApi {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const querCopy = { ...this.queryStr };

      
    //removie some filted
    const removeFeilds = ["page", "keyword", "limit"];
    removeFeilds.forEach((key) => delete querCopy[key]);

    //sort for price and rating
    let queryStr = JSON.stringify(querCopy);
    queryStr = queryStr.replace(/\b(lt|lte|gt|gte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = myQueryApi;
