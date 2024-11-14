import React, { useEffect } from "react";
import { useState, ChangeEvent } from "react";
import characterData from "../assets/characters.json"
import styles from "./CharacterList.module.scss";

export function CharacterList() {
    const [characters, setCharacters] = useState(characterData);
    const [category, setCategory] = useState("");
    const [order, setOrder] = useState("alphabetical");
    

    const handleUpdate = () => {
        let newCharacterData = characterData.filter(
            character => {
                if(!category) {
                    return true
                }

                if(character.category === category){
                    return true
                } else {
                    return false
                }
            }
        )

        if (order === "alphabetical") {
            setCharacters(newCharacterData.sort((a,b) => a.name > b.name ? 1 : -1))
        } else {
            setCharacters(newCharacterData.sort((a,b) => a.significanceIndex > b.significanceIndex ? 1 : -1))
        }
    }

    const handleCategoryFilter = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value)
    }

    const handleOrderFilter = (event: ChangeEvent<HTMLSelectElement>) => {
        setOrder(event.target.value)
    }

    useEffect(() => {
        handleUpdate();
    }, [category, order]);

    if (!characters) {
        return <div>Loading...</div>;
      }
      
    return (
        <div>
            <select name="category" onChange={handleCategoryFilter}>
            <option value="">Category</option>
            <option value="human">human</option>
            <option value="wizard">wizard</option>
            <option value="hobbit">hobbit</option>
            </select>
            <select name="order" onChange={handleOrderFilter}>
            <option value="alphabetical">Alphabetical</option>
            <option value="Significance">Significance</option>
            </select>
            <ul>
                {characters.map((character) => (
                    <li className={styles["Character-container"]}>
                        <p>{character.name}</p>
                        <p>{character.category}</p>
                        <p>Significance: {character.significanceIndex}</p>
                        <p>{character.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}