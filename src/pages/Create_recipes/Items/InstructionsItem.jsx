import React from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'

export const InstructionsItem = ({ recipe, setRecipe }) => {

  const handleInstructionChange = (evt, idx) => {
    const { value } = evt.target;
    const instructions = recipe.instructions;
    instructions[idx] = value;
    setRecipe({...recipe, instructions })
  }
  
  const addInstruction = () => {
    setRecipe({...recipe, instructions: [...recipe.instructions, ""]})
  }

  const delInstruction = () => {
    setRecipe({...recipe, instructions: recipe.instructions.slice(0,recipe.instructions.length - 1)})
  }

  return (
    <div>
      <label htmlFor='instructions' className='text-[13px] text-gray-500 font-semibold mt-4 mb-2'>Instructions</label>
      {
        recipe.instructions.map((instruction, idx) => (
          <div key={idx} className='flex flex-row justify-center items-center py-1'>
            <textarea
              name="instructions"
              id="instructions"
              rows="3"
              className="block resize p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your steps here and add more"
              value={instruction}
              required
              onChange={(evt) => handleInstructionChange(evt, idx)}
            ></textarea>                
            <button type="button" className='rounded-md text-white font-medium ml-3 w-1/12' onClick={addInstruction}><AiOutlinePlusCircle className='text-emerald-500' size={24} /></button>
            {recipe.instructions.length > 1 && <button type="button" className='rounded-md text-white font-medium w-1/12' onClick={delInstruction}><AiOutlineMinusCircle className='text-red-500' size={24} /></button>}
          </div>
        ))
      }
    </div>
  )
}
