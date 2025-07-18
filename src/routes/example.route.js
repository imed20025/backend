import express from 'express';
import exampleControllers from '../controllers/example.controller.js'

const router = express.Router(); 
// Define routes
router.post('/', exampleControllers.createExample); 
router.get('/', exampleControllers.getAllExample);  
router.get('/:id', exampleControllers.getOneExample);  
router.put('/:id',exampleControllers.updateExample);  
router.delete('/:id', exampleControllers.deleteExample);  

export default router;