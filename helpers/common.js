exports.getPagination = (page, per_page) => {
  const limit = per_page ? per_page : 10000
  const offset = page && page > 1 ? (page - 1) * limit : 0

  return {
    limit: parseInt(limit),
    offset: parseInt(offset)
  };
}