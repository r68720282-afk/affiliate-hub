export const importProduct = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "Product URL is required."
    });
  }

  return res.status(501).json({
    success: false,
    message:
      "Auto import module is not implemented yet. This endpoint is reserved for future official integrations.",
    url
  });
};
