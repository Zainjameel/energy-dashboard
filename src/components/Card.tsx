import type { ReactNode } from "react";

export default function Card({                                                    //This creates a React functional component called Card
  title,
  right,                    //Destructuring props in the function argument
  children,
  className = "",
}: {
  title: string;            //mean Required prop Must be a string
  right?: ReactNode;        //Optional prop (?)   Can be any renderable React content
  children: ReactNode;      //Required  Represents whatever is inside the component
  className?: string;       //Optional CSS class    Used to add extra styling
}) {
  return (                  //This is the UI output of the component
    <section className={`panel ${className}`}>      
      <div className="panelHeader">
        <div className="panelTitle">{title}</div>
        <div className="panelTools">{right ?? "***"}</div>
      </div>
      {children}
    </section>
  );
}

//<section className={`panel ${className}`}> Uses a <section> HTML tag (semantic HTML)Combines: Base class: panel 
// Optional extra class: className

/*
<div className="panelTools">{right ?? "⋯"}</div>
This line is important 

right ?? "⋯"
Uses the nullish coalescing operator

Means:

If right is null or undefined

show "⋯" instead
*/
/*
{children}
This is where nested content appears

Allows the card to be reusable

Example:

<Card title="Usage">
  <Chart />
  <Legend />
</Card>
*/

/*
Example usage
<Card
  title="Energy by Month"
  right={<button>Export</button>}
  className="large"
>
  <MonthlyChart />
</Card>
*/