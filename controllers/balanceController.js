const { Balance, Transaction } = require("../models");

exports.getBalance = async (req, res) => {
    const userId = req.user.id;
    const balance = await Balance.findOne({ where: { user_id: userId } });

    res.json({
        status: 0,
        message: "Get Balance Berhasil",
        data: { balance: balance?.balance },
    });
};

exports.topUp = async (req, res) => {
    const userId = req.user.id;
    const { top_up_amount } = req.body;

    const amount = parseInt(top_up_amount, 10);

    const [balance, created] = await Balance.findOrCreate({
        where: { user_id: userId },
        defaults: {
            balance: 0,
        },
    });

    balance.balance += amount;
    await balance.save();

    const invoiceNumber = `INV${new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "")}-${Date.now()}`;

    await Transaction.create({
        user_id: userId,
        invoice_number: invoiceNumber,
        transaction_type: "TOPUP",
        description: "Top Up balance",
        total_amount: amount,
        created_on: new Date(),
    });

    res.json({
        status: 0,
        message: "Top Up Balance berhasil",
        data: {
            balance: balance.balance,
        },
    });
};
