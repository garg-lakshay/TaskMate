import Log from "../model/log.model";

const errorHandler = async (err: any, req: any, res: any, next: any) => {
  try {
    await Log.create({
      message: err.message,
      stack: err.stack,
      route: req.originalUrl,
      method: req.method,
      user: req.user?._id || null,
    });
  } catch (logError) {
    console.error("Failed to write error log:", logError);
  }

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
