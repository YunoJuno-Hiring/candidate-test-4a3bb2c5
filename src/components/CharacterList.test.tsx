import { CharacterList } from './CharacterList'
import React from 'react'
import { render, screen, waitFor } from "@testing-library/react";

const mockCharacters = [
    {
        "name": "Frodo Baggins",
        "category": "hobbit",
        "description": "A young well-to-do hobbit. When he discovers that the magic ring left to him by his eccentric Uncle Bilbo is the One Ring, he reluctantly takes on the quest to destroy it. Often referred to as the Ringbearer.",
        "significanceIndex": 0,
        "avatar": "frodo_baggins.jpg"
    },
    {
        "name": "Gandalf the Grey",
        "category": "wizard",
        "description": "A wizard best known among hobbits for his fireworks and mischievous sense of humor, but actually one of the greatest powers of Middle-earth. He reveals the truth about the Ring to Frodo and acts as a guide and counselor.",
        "significanceIndex": 1,
        "avatar": "gandalf_the_grey.jpg"
    },
    {
        "name": "Samwise Gamgee",
        "category": "hobbit",
        "description": "Frodo's gardener at home, and his servant and friend on the quest. Sam is very fond of stories about dragons and elves. A member of the Fellowship, he stays with Frodo after it is broken.",
        "significanceIndex": 2,
        "avatar": "samwise_gamgee.jpg"
    }
    
]

beforeEach(() => {

    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({mockCharacters}),
        }),
      ) as jest.Mock;
});

afterEach(() => {
    jest.clearAllMocks();
});

test("Loads the unfiltered chacters list", async () =>{
    render(<CharacterList />)
    
    waitFor(() => {
        expect(screen.getByText("Frodo Baggins")).toBeTruthy()
    })
    expect(global.fetch).toHaveBeenCalled()
    expect(screen.getAllByTestId("title")).toEqual(3)
  })
  
// describe("when filtering the category", () => {
//     it("Loads the correctly filtered chacters list", () =>{
      
//     })
  
//     it("does not change the order", () =>{
      
//     })
//   })
  
// describe("when ordering the category", () => {
//     it("Loads the correctly ordered chacters list", () =>{
      
//     })
  
//     it("does not change the filter", () =>{
      
//     })
//   })
  