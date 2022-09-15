const rgx = (pattern) => new RegExp(pattern, 'i');

const getPeerFilter = (search, array) => {
  if (!search) return;

  const parseField = array?.map((item) => ({
    [item]: { $regex: rgx(search) },
  }));
  return {
    $or: parseField,
  };
};

module.exports = getPeerFilter;
