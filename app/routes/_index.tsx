import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Hospital Waiting MVP" },
    { name: "description", content: "mvp for the idea" },
  ];
};

const CardsContent=[
  {
    heading:"Lab Tests.",
    subheading:"Simple pickup at your home.",
    color:"bg-cardcoloralgae"
  },
  {
    heading:"Find The Doctors Near You.",
    subheading:"Confirmed Appointments",
    color:"bg-cardcoloryellow ",
    image:""
  },
  {
    heading:"Instant video consultation.",
    subheading:"Connect within 60 seconds.",
    color:"bg-cardcoloralgae",
    image:""
  },
  {
    heading:"24/7 medicine.",
    subheading:"Essentials at your doorstep.",
    color:"bg-cardcolorpink"
  }

]
export default function Index() {
  const navigate=useNavigate()
  return (
    <div className="flex h-auto w-screen items-center mt-20 justify-start flex-col p-1">
      {/* top card */}
      <div className="flex items-center justify-start flex-col bg-cardcolorprimary h-auto lg:h-primaryheight p-2 rounded-3xl w-96 sm:w-primarywidth">
        <h1 className="text-white font-bold text-4xl mt-4 outfit-card text-textheading lg:text-textheading-lg lg:mt-10 " >HealthKerala</h1>
        <div className="flex items-center justify-evenly w-full m-14 lg:mt-24">
          <div className="flex items-center justify-evenly">
            <div className="w-8 h-6 rounded-3xl bg-cardcolorpink"></div>
            <p className="text-white ml-2 text-sm" >Reduce HbA1c</p>
          </div>
          <div className="flex items-center justify-evenly">
            <div className="w-8 h-6 rounded-3xl bg-cardcolorgreen"></div>
            <p className="text-white ml-2 text-sm" >Reduce HbA1c</p>
          </div>
        </div>
        <div className="w-full flex justify-end items-center lg:mt-24">
            <div className="w-52 flex items-center justify-center h-10 rounded-3xl bg-cardcolorpink">
              <p className="text-center align-middle font-bold text-xs" >Book Consultation</p>
            </div>
            <div className="h-10 w-10 bg-cardcolorpink rounded-3xl ml-2" ></div>
          </div>


      </div>
      {/* four cards */}
      <div className="flex items-center justify-evenly xs:flex-col lg:flex-row  w-full">
          {/* first card */}
          {
            CardsContent.map((content,index)=>{
              return(

            <div key={index} className={`flex pl-2 pr-2 items-center flex-col justify-start ${content.color} w-72 h-44 mt-10 rounded-xl`}>
              <h1 className="font-bold  mt-2 text-lg text-cardcolorprimary outfit-card-custom" >{content.heading}</h1>
              <p className="outfit-card-custom mt-2 text-sm text-cardcolorprimary" >{content.subheading}</p>
              <div className="flex w-full justify-evenly mt-4" >
              <button className="bg-cardcolorprimary w-16 h-16 mt-2 rounded-full"></button>
                      {/* <img src="/inbox.png" className="h-20 w-20 rounded-full" alt="cardbanner"/> */}
              </div>
            </div>
              )
            })
          }

      </div>
      {/* heading */}
      <div className="flex items-center justify-center">
        <h1 className="w-96 text-center mt-4 text-cardcolortext-blue font-bold outfit-card-custom" >our doctors and clinics have earned over 5,000+ reviews on google!</h1>
      </div>
      {/* button */}
          <Button onClick={()=>navigate('/login')} variant={"ghost"} className="border-2 border-cardcolorprimary rounded-3xl m-4">
            <div className="h-3 rounded-full w-3 bg-green-950"></div>
            <p className="text-cardcolortext-blue" >Explore</p>
          </Button>
    </div>
  );
}