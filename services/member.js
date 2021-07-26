const MemberModel = require('../models/member')

class MemberService {
  static async findAll() {
    return MemberModel.find({}).populate('borrowedBooks').exec()
  }

  static async findOne(condition = {}) {
    return MemberModel.findOne(condition)
  }

  static async create(member) {
    return MemberModel.create(member)
  }

  static async remove(memberId) {
    return MemberModel.findByIdAndRemove(memberId)
  }
}

module.exports = MemberService