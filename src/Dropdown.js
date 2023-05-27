import { useMemo, useState } from "react";  
import { DropDownList } from "@progress/kendo-react-dropdowns";  
  
// Dropdown categories  
const categories = ["all", "recipe", "video", "article"];  
  
  
// Results data filtered using categories  
const data = [  
  {  
    id: 1,  
    label: "Best Ramen ever",  
    type: "recipe",  
  },  
  {  
    id: 2,  
    label: "Top 10 Mexican dishes",  
    type: "article",  
  },  
  {  
    id: 3,  
    label: "How to prepare a whole roast chicken",  
    type: "video",  
  },  
  {  
    id: 4,  
    label: "Chilli Chicken Gnocchi",  
    type: "recipe",  
  },  
  {  
    id: 5,  
    label: "Best 5 ice desserts for hot summer",  
    type: "article",  
  },  
];  
  
export const RecipeDropDownList = () => {  
  // Store currently selected category  
  const [category, setCategory] = useState("");  
  
  // Memoized results. Will re-evaluate any time selected  
  // category changes  
  const filteredData = useMemo(() => {  
    if (!category || category === "all") return data;  
  
    return data.filter(item => item.type === category);  
}, [category]);  
  

  return (
    <section className="k-my-8">
      <form className="k-form k-mb-4">
        <label className="k-label k-mb-3">Category</label>
        <DropDownList data={categories} onChange={e => setCategory(e.value)} />
      </form>

      <section className="k-listgroup">
        <ul>
          {filteredData.map(item => {
            return (
              <li key={item.id} className="k-listgroup-item">
                {item.label}
              </li>
            );
          })}
        </ul>
      </section>
    </section>
  );
};