"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface CountdownTimerProps {
  endTime: number
}

export default function CountdownTimer({ endTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endTime - Date.now()

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        hours: Math.floor(difference / (1000 * 60 * 60)),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      })
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0")
  }

  return (
    <div className="flex items-center justify-center gap-2 bg-[#FFCB2D] text-black p-3 rounded-lg">
      <Clock className="h-5 w-5" />
      <span className="font-bold">Fin des offres dans:</span>
      <div className="flex items-center gap-1">
        <div className="bg-black text-white px-2 py-1 rounded">{formatTime(timeLeft.hours)}</div>
        <span>:</span>
        <div className="bg-black text-white px-2 py-1 rounded">{formatTime(timeLeft.minutes)}</div>
        <span>:</span>
        <div className="bg-black text-white px-2 py-1 rounded">{formatTime(timeLeft.seconds)}</div>
      </div>
    </div>
  )
}
