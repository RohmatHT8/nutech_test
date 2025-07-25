const { Service, Transaction, Balance } = require("../models");
exports.createTransaction = async (req, res) => {
    const userId = req.user.id;
    const { service_code } = req.body;

    const service = await Service.findOne({ where: { service_code } });
    if (!service)
        return res
            .status(400)
            .json({ status: 1, message: "Service ataus Layanan tidak ditemukan" });

    const balance = await Balance.findOne({ where: { user_id: userId } });
    if (!balance || balance.balance < service.service_tariff) {
        return res
            .status(400)
            .json({ status: 1, message: "Saldo tidak cukup" });
    }

    balance.balance -= service.service_tariff;
    await balance.save();

    const invoiceNumber = `INV${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")}-${Date.now()}`;

    const transaction = await Transaction.create({
        user_id: userId,
        invoice_number: invoiceNumber,
        service_code: service.service_code,
        service_name: service.service_name,
        transaction_type: "PAYMENT",
        description: service.service_name,
        total_amount: service.service_tariff,
        created_on: new Date(),
    });

    res.json({
        status: 0,
        message: "Transaksi berhasil",
        data: {
            invoice_number: transaction.invoice_number,
            service_code: transaction.service_code,
            service_name: transaction.service_name,
            transaction_type: transaction.transaction_type,
            total_amount: transaction.total_amount,
            created_on: transaction.created_on,
        },
    });
};

exports.getHistory = async (req, res) => {
  const userId = req.user.id;
  const { offset = 0, limit = 3 } = req.query;

  const records = await Transaction.findAll({
    where: { user_id: userId },
    offset: parseInt(offset),
    limit: parseInt(limit),
    order: [['created_on', 'DESC']],
  });

  res.json({
    status: 0,
    message: "Get History Berhasil",
    data: { offset: +offset, limit: +limit, records }
  });
};

