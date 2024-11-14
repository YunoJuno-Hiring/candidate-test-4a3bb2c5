import React, { useEffect } from "react";
import { useState, ChangeEvent } from "react";
import styles from "./CharacterList.module.scss";

type Character = {
    name: string;
    category: string;
    description: string;
    significanceIndex: number;
    avatar: string;

}

export function CharacterList() {
    const [allCharacters, setAllCharacters] = useState<Character[]>([]);
    const [characters, setCharacters] = useState<Character[]>([]);
    const [category, setCategory] = useState("");
    const [order, setOrder] = useState("significance");
    
    useEffect(() => {
        fetch("/assets/characters.json")
            .then((response) => response.json())
            .then((data) => {
                setCharacters(data)
                setAllCharacters(data)
            });
    }, []);

    const handleUpdate = () => {
        let newCharacterData = allCharacters.filter(
            (character: Character) => {
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
            setCharacters(newCharacterData.sort((a: Character, b: Character) => a.name > b.name ? 1 : -1))
        } else {
            setCharacters(newCharacterData.sort((a: Character, b: Character) => a.significanceIndex > b.significanceIndex ? 1 : -1))
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
    }, [category, order, allCharacters]);

    if (!characters) {
        return <div>Loading...</div>;
      }
      
    return (
        <div>
            <div className={styles["Filter-container"]}>
                <label className={styles["Category"]} htmlFor="category-select">Category:</label>
                <select className={styles["Category"]} name="category" id="category-select" onChange={handleCategoryFilter}>
                    <option value="">All Roles</option>
                    <option value="human">human</option>
                    <option value="wizard">wizard</option>
                    <option value="hobbit">hobbit</option>
                </select>
                <label className={styles["Order"]}  htmlFor="order-select">Order:</label>
                <select className={styles["Order"]}  name="order" id="order-select" onChange={handleOrderFilter}>
                    <option value="Significance">Significance</option>
                    <option value="alphabetical">Alphabetical</option>
                </select>
            </div>

            <ul>
                {characters.map((character: Character) => (
                    <li key={character.name} className={styles["Character-container"]}>
                        <p className={styles["Character-title"]}>{character.name}</p>
                        <img src={`assets/characters/${character.avatar}`} className={styles["Character-picture"]}/>
                        <p className={styles["Character-category"]}>{character.category}</p>
                        <p className={styles["Character-description"]}>{character.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}