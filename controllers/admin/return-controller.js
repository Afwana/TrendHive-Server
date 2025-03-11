const Return = require("../../models/Return");

const fetchAllReturns = async (req, res) => {
  try {
    const returns = await Return.find({});
    res.status(200).json({
      success: true,
      data: returns,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const updateReturnStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const returnRequest = await Return.findById(id);

    if (!returnRequest) {
      return res.status(404).json({
        success: false,
        message: "Return not found!",
      });
    }

    await Return.findByIdAndUpdate(id, { status });

    res.status(200).json({
      success: true,
      message: "Return status is updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const deleteReturnRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const returnRequest = await Return.findByIdAndDelete(id);

    if (!returnRequest)
      return res.status(404).json({
        success: false,
        message: "Return request with id not found.",
      });

    res.status(200).json({
      success: true,
      message: "Return request deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

module.exports = {
  fetchAllReturns,
  updateReturnStatus,
  deleteReturnRequest,
};
