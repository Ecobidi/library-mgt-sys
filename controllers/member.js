const MemberService = require('../services/member')
const BorrowedService = require('../services/borrowed')

class MemberController {

  static async getMembersPage(req, res, next) {
    let allMembers = await MemberService.findAll()
    let allBorrowedBooks = await BorrowedService.findAll()

    let members = allMembers.map(({_id, memberId, firstName, lastName, phone}) => {
      let memberBorrowedBooks = allBorrowedBooks.filter(bb => bb.memberId == memberId)
      let mm = {_id, memberId, firstName, lastName, phone}
      mm.borrowed = memberBorrowedBooks
      return mm
    })

    res.render('members', {members})
  }

  static async getCreateMemberPage(req, res, next) {
    res.render('new-member')
  }

  static async handleCreateMember(req, res, next) {
    const member = req.body
    console.log(member)
    try {
      await MemberService.create(member)
      res.redirect('/members')
    } catch (error) {
      console.log(error)
      req.flash('err_msg', 'Error inserting member to database')
      res.redirect('/members/new')
    } 
  }

  static async handleRemoveMember(req, res, next) {
    const member_id = req.params.member_id
    try {
      await MemberService.remove(member_id)
      res.redirect('/members')
    } catch (error) {
      req.flash('error_msg', 'Error removing member from database')
      res.redirect('/members')
    }
  }
}

module.exports = MemberController