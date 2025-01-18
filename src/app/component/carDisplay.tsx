

"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiFillHeart } from "react-icons/ai"
import { BsFuelPump, BsPeople } from "react-icons/bs"
import { PiSteeringWheel } from "react-icons/pi"
import { client } from '@/sanity/lib/client'

type CarCardProps = {
  name: string
  type: string
  image: string // Changed to string to support URLs from Sanity
  fuelCapacity: string
  transmission: string
  capacity: string
  price: number
  discountedPrice?: number
  isFavorite: boolean
}

const CarCard: React.FC<CarCardProps> = ({
  name,
  type,
  image,
  fuelCapacity,
  transmission,
  capacity,
  price,
  discountedPrice,
  isFavorite: initialFavorite
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite)

  return (
    <div className="flex flex-col p-5 bg-white rounded-[10px] w-full md:w-[304px] min-w-[240px] relative shadow-[0_0_10px_rgba(0,0,0,0.05)] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-shadow duration-300">
      <button 
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-3 right-3 p-1 hover:opacity-80 transition-opacity"
      >
        <AiFillHeart 
          className={`h-5 w-5 ${
            isFavorite ? 'text-[#ED3F3F]' : 'text-[#D7E5FF]'
          }`} 
        />
      </button>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[16px] font-semibold text-[#1A202C]">{name}</h3>
          <p className="text-[14px] text-[#90A3BF]">{type}</p>
        </div>
      </div>
      <div className="relative h-[120px] my-6">
        <Image
          src={image}
          alt={`${name} car`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex justify-between mb-6">
        <div className="flex items-center gap-2">
          <BsFuelPump className="text-[#90A3BF] w-[14px] h-[14px]" />
          <span className="text-[14px] text-[#90A3BF]">{fuelCapacity}</span>
        </div>
        <div className="flex items-center gap-2">
          <PiSteeringWheel className="text-[#90A3BF] w-[14px] h-[14px]" />
          <span className="text-[14px] text-[#90A3BF]">{transmission}</span>
        </div>
        <div className="flex items-center gap-2">
          <BsPeople className="text-[#90A3BF] w-[14px] h-[14px]" />
          <span className="text-[14px] text-[#90A3BF]">{capacity}</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-auto">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-[16px] font-semibold text-[#1A202C]">
              ${price}
            </span>
            <span className="text-[14px] text-[#90A3BF]">/day</span>
          </div>
          {discountedPrice && (
            <p className="text-[14px] text-[#90A3BF] line-through">
              ${discountedPrice}
            </p>
          )}
        </div>
        <Link href="/detail">
          <button className="bg-[#3563E9] text-white px-4 py-[10px] rounded-[4px] text-[14px] font-semibold hover:bg-[#2952cc] transition-colors">
            Rent Now
          </button>
        </Link>
      </div>
    </div>
  )
}

const CarList: React.FC = () => {
  const [cars, setCars] = useState<CarCardProps[]>([])

  useEffect(() => {
    const fetchCars = async () => {
      const carsData = await client.fetch(`*[_type == "cars"]{
        name,
        type,
        "image": image.asset->url,
        "fuelCapacity": fuel_capacity,
        "transmission": transmission,
        "capacity": seating_capacity,
        "price": price_per_day,
        "discountedPrice": original_price,
        "isFavorite": false
      }`)
      setCars(carsData)
    }
    fetchCars()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car.name} {...car} />
      ))}
    </div>
  )
}

export default CarList
