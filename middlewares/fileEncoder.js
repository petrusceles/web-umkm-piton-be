const fileEncoder = async (req, res, next) => {
  try {
    // console.log(req.body)
    if (req.files != undefined) {
      // console.log("Masuk");
      // console.log(req.files.picture.length);
      if (req.files.picture != undefined) {
        const fileToUpload = req.files.picture[0];
        const fileBase64 = fileToUpload.buffer.toString("base64");
        req.picture = `data:${fileToUpload.mimetype};base64,${fileBase64}`;
      }
      if (req.files.icon != undefined) {
        const fileToUpload = req.files.icon[0];
        const fileBase64 = fileToUpload.buffer.toString("base64");
        req.icon = `data:${fileToUpload.mimetype};base64,${fileBase64}`;
      }
      if (req.files.logo != undefined) {
        const fileToUpload = req.files.logo[0];
        const fileBase64 = fileToUpload.buffer.toString("base64");
        req.logo = `data:${fileToUpload.mimetype};base64,${fileBase64}`;
      }
    }
    // console.log(req);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: String(err),
      data: null,
    });
  }
};

module.exports = { fileEncoder };
