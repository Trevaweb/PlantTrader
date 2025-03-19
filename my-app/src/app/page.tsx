"use client"
import './styles.css';
import { useState } from 'react';
import React from 'react';

interface Plant {
  category: string;
  name: string;
  price?: string;
  picture?: string;
  id: string;
  quantity: number;
}

interface PlantCategoryRowProps {
  category: string;
}

interface PlantRowProps {
  plant: Plant;
}

interface TableProps {
  plants: Plant[];
}

interface FilterablePlantWishlistProps {
  wishlistPlants: Plant[];
  tradePlants: Plant[];
}

function PlantCategoryRow({ category }: PlantCategoryRowProps) {
  return (
    <tr>
      <th colSpan={3} className="category-row">
        {category}
      </th>
    </tr>
  );
}

function PlantRow({ plant, onTogglePriority, isPrioritized, showHeart = false }: PlantRowProps & { 
  onTogglePriority: (id: string) => void, 
  isPrioritized: boolean,
  showHeart?: boolean 
}) {
  return (
    <tr>
      {showHeart && (
        <td>
          <button 
            className={`heart-button ${isPrioritized ? 'prioritized' : ''}`}
            onClick={() => onTogglePriority(plant.id)}
            aria-label={isPrioritized ? 'Remove from priority' : 'Add to priority'}
          >
            ♥
          </button>
        </td>
      )}
      <td>{plant.name}</td>
      {plant.price && <td>{plant.price}</td>}
      <td>{plant.quantity}</td>
      {plant.picture && <td className="plant-emoji">{plant.picture}</td>}
    </tr>
  );
}

function WishlistTable({ plants, prioritizedPlants, onTogglePriority }: TableProps & { 
  prioritizedPlants: Set<string>,
  onTogglePriority: (id: string) => void 
}) {
  const rows: React.ReactElement[] = [];
  let lastCategory: string | null = null;

  // First, add prioritized plants
  const prioritizedPlantsList = plants.filter(plant => prioritizedPlants.has(plant.id));
  if (prioritizedPlantsList.length > 0) {
    rows.push(
      <PlantCategoryRow
        category="Priority"
        key="priority" />
    );
    prioritizedPlantsList.forEach((plant) => {
      rows.push(
        <PlantRow
          plant={plant}
          key={`priority-${plant.name}`}
          onTogglePriority={onTogglePriority}
          isPrioritized={true}
          showHeart={true}
        />
      );
    });
  }

  // Then add non-prioritized plants by category
  const nonPrioritizedPlants = plants.filter(plant => !prioritizedPlants.has(plant.id));
  nonPrioritizedPlants.forEach((plant) => {
    if (plant.category !== lastCategory) {
      rows.push(
        <PlantCategoryRow
          category={plant.category}
          key={plant.category} />
      );
    }
    rows.push(
      <PlantRow
        plant={plant}
        key={plant.name}
        onTogglePriority={onTogglePriority}
        isPrioritized={false}
        showHeart={true}
      />
    );
    lastCategory = plant.category;
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Priority</th>
          <th>Plant</th>
          <th>Quantity</th>
          <th>Picture</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form className="search-form">
      <input 
        type="text" 
        placeholder="Search..." 
        className="search-input"
      />
      <label>
        <input type="checkbox" />
        {' '}
        Only show plants I have
      </label>
    </form>
  );
}

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">PlantTrader</div>
      <div className="navbar-links">
        <a href="#" className="active">Wishlist</a>
        <a href="#">Trades</a>
        <a href="#">Profile</a>
      </div>
    </nav>
  );
}

function FilterablePlantWishlist({wishlistPlants, tradePlants}: FilterablePlantWishlistProps) {
  const [prioritizedPlants, setPrioritizedPlants] = useState<Set<string>>(new Set());

  const handleTogglePriority = (plantId: string) => {
    setPrioritizedPlants(prev => {
      const newSet = new Set(prev);
      if (newSet.has(plantId)) {
        newSet.delete(plantId);
      } else {
        newSet.add(plantId);
      }
      return newSet;
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <SearchBar />
        <div className="lists-container">
          <div className="list-section">
            <h2>Wishlist</h2>
            <div className="list-box">
              <WishlistTable 
                plants={wishlistPlants} 
                prioritizedPlants={prioritizedPlants}
                onTogglePriority={handleTogglePriority}
              />
            </div>
          </div>
          <div className="list-section">
            <h2>For Trade</h2>
            <div className="list-box">
              <TradeTable plants={tradePlants} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PLANTS = [
  {id: "1", category: "Pothos", name: "Golden Pothos", quantity: 1},
  {id: "2", category: "Pothos", name: "Marble Queen Pothos", quantity: 2},
  {id: "3", category: "Monstera", name: "Monstera Deliciosa", quantity: 1},
  {id: "4", category: "Monstera", name: "Monstera Thai Constellation", quantity: 1},
  {id: "5", category: "Philodendron", name: "Philodendron Brasil", quantity: 3},
  {id: "6", category: "Philodendron", name: "Philodendron Pink Princess", quantity: 1},
  {id: "7", category: "Succulents", name: "Echeveria 'Perle von Nürnberg'", quantity: 2},
  {id: "8", category: "Succulents", name: "String of Pearls", quantity: 1},
  {id: "9", category: "Ferns", name: "Boston Fern", quantity: 1},
  {id: "10", category: "Ferns", name: "Maidenhair Fern", quantity: 1}
];

const TRADEPLANTS = [
  {
    id: "t1",
    category: "Calathea", 
    price: "$35", 
    name: "Calathea Orbifolia",
    picture: "🌿",
    quantity: 2
  },
  {
    id: "t2",
    category: "Calathea", 
    price: "$75", 
    name: "Calathea Madeupia",
    picture: "🌱",
    quantity: 1
  },
  {
    id: "t3",
    category: "Alocasia", 
    price: "$55", 
    name: "Alocasia Polly",
    picture: "🌳",
    quantity: 3
  },
  {
    id: "t4",
    category: "Ficus", 
    price: "$45", 
    name: "Ficus Elastica 'Ruby'",
    picture: "🌴",
    quantity: 1
  },
  {
    id: "t5",
    category: "Zamioculcas", 
    price: "$40", 
    name: "ZZ Plant",
    picture: "🌵",
    quantity: 2
  }
];

//For Trade
function TradeTable({ plants }: TableProps) {
  const rows: React.ReactElement[] = [];
  let lastCategory: string | null = null;

  plants.forEach((plant) => {
    if (plant.category !== lastCategory) {
      rows.push(
        <PlantCategoryRow
          category={plant.category}
          key={plant.category} />
      );
    }
    rows.push(
      <PlantRow
        plant={plant}
        key={plant.name}
        onTogglePriority={(id) => {}}
        isPrioritized={false}
        showHeart={false}
      />
    );
    lastCategory = plant.category;
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Plant</th>
          <th>Estimated Value</th>
          <th>Quantity</th>
          <th>Picture</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default function App() {
  return <FilterablePlantWishlist wishlistPlants={PLANTS} tradePlants = {TRADEPLANTS} />;
}


