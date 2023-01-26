const multer = require("multer");

const fileUpload = (req, res, next) => {
  const storage = multer.memoryStorage();

  const upload = multer({ storage, limits: { fileSize: 2000000 } }).fields([
    {
      name: "picture",
      maxCount: 1,
    },
    { name: "icon", maxCount: 1 },
    { name: "logo", maxCount: 1 },
  ]);

  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        status: false,
        message: String(err),
        data: null,
      });
    } else if (err) {
      return res.status(500).json({
        status: false,
        message: String(err),
        data: null,
      });
    }
    next();
  });
};

module.exports = { fileUpload };
// module.exports = multer({ storage, limits: { fileSize: 2000000 } });
