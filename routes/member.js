const router = require('express').Router()
const MemberController = require('../controllers/member')

router.get('/', MemberController.getMembersPage)

router.get('/new', MemberController.getCreateMemberPage)

router.post('/new', MemberController.handleCreateMember)

router.get('/delete/:member_id', MemberController.handleRemoveMember)

module.exports = router