import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { SubjectValidation } from './subject.validation';
import { SubjectControllers } from './subject.controller';
import { auth } from '../../middleware/auth';

const router = express.Router();
router.post('/',auth('Tutor'),validateRequest(SubjectValidation.subjectValidationSchema),SubjectControllers.createSubject);
router.get("/",SubjectControllers.getAllSubjects)
router.get("/:id",SubjectControllers.getSubject)
router.delete('/:id', auth('Tutor'), SubjectControllers.deleteSubject);
router.patch('/:id', auth('Tutor'), SubjectControllers.updateSubject);
export const SubjectRoutes = router;