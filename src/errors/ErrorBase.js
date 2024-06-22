class ErroBase extends Error {
  constructor(message = "Erro interno de servidor", status = 500) {
    super();
    this.status = status;
    this.message = message;
  }

  sendResponse(res) {
    return res.status(this.status)
      .json({
        messaga: this.message,
        status: this.status
      });
  }
}

export default ErroBase;