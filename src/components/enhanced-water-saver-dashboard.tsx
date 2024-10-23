"use client"

import { useState, useEffect, useMemo } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell, Legend, Tooltip, LineChart, Line, CartesianGrid } from "recharts"
import { Droplet, Users, Home, BarChart2, Award, Lightbulb, ChevronDown, ChevronUp, Zap, TrendingDown, Settings, Target, ShoppingBag, Globe, Sun, Moon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

const leaderboardData = [
  { name: "You", usage: 1364, rank: 3, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Rahul S.", usage: 1250, rank: 1, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Priya M.", usage: 1300, rank: 2, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Amit K.", usage: 1400, rank: 4, avatar: "/placeholder.svg?height=32&width=32" },
  { name: "Neha G.", usage: 1450, rank: 5, avatar: "/placeholder.svg?height=32&width=32" },
]

const tips = [
  "Fix leaky faucets and pipes",
  "Take shorter showers",
  "Use a water-efficient dishwasher",
  "Water your lawn in the early morning or late evening",
  "Collect rainwater for gardening",
  "Install low-flow showerheads",
  "Use a broom instead of a hose to clean driveways",
  "Reuse greywater for plants",
]

const challenges = [
  { name: "5-minute shower challenge", points: 50, description: "Take showers under 5 minutes for a week" },
  { name: "Fix a leak", points: 100, description: "Identify and fix a leaky faucet or pipe" },
  { name: "Waterless car wash", points: 75, description: "Clean your car without using running water" },
  { name: "Collect rainwater", points: 150, description: "Set up a rainwater collection system" },
]

const waterSavingDevices = [
  { name: "Low-flow showerhead", savings: 2600, cost: 20 },
  { name: "Dual-flush toilet", savings: 15000, cost: 250 },
  { name: "Water-efficient washing machine", savings: 11000, cost: 600 },
  { name: "Smart irrigation system", savings: 20000, cost: 150 },
]

const COLORS = ['#0EA5E9', '#22D3EE', '#67E8F9', '#A5F3FC']

const badges = [
  { name: "Water Saver Novice", description: "Save your first 100 liters", icon: "🌱" },
  { name: "Eco Warrior", description: "Complete 5 water-saving challenges", icon: "🛡️" },
  { name: "Droplet Master", description: "Maintain below-average usage for a month", icon: "💧" },
  { name: "Green Thumb", description: "Set up a rainwater collection system", icon: "🌿" },
]

export default function EnhancedWaterSaverDashboard() {
  const [selectedTab, setSelectedTab] = useState("weekly")
  const [showAllTips, setShowAllTips] = useState(false)
  const [points, setPoints] = useState(0)
  const [showPointAnimation, setShowPointAnimation] = useState(false)
  const [waterUsageData, setWaterUsageData] = useState([
    { day: "Mon", usage: 0 },
    { day: "Tue", usage: 0 },
    { day: "Wed", usage: 0 },
    { day: "Thu", usage: 0 },
    { day: "Fri", usage: 0 },
    { day: "Sat", usage: 0 },
    { day: "Sun", usage: 0 },
  ])
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState("food")
  const [earnedBadges, setEarnedBadges] = useState([])
  const { theme, setTheme } = useTheme()

  const totalUsage = useMemo(() => waterUsageData.reduce((sum, day) => sum + day.usage, 0), [waterUsageData])
  const averageUsage = useMemo(() => Math.round(totalUsage / waterUsageData.length), [totalUsage, waterUsageData.length])
  const neighborAverage = 200 // Mock data for neighbor's average
  const weeklyGoal = 1500 // Mock weekly water usage goal
  const weeklyUsage = totalUsage
  const goalProgress = useMemo(() => (weeklyUsage / weeklyGoal) * 100, [weeklyUsage, weeklyGoal])
  const waterSaved = useMemo(() => Math.max(0, (neighborAverage * 7) - weeklyUsage), [neighborAverage, weeklyUsage])

  const waterUsageBreakdown = useMemo(() => {
    const total = totalUsage
    return [
      { name: "Bathroom", value: Math.round(total * 0.4) },
      { name: "Kitchen", value: Math.round(total * 0.3) },
      { name: "Laundry", value: Math.round(total * 0.2) },
      { name: "Other", value: Math.round(total * 0.1) },
    ]
  }, [totalUsage])

  const virtualWaterFootprint = useMemo(() => {
    const footprints = {
      food: totalUsage * 0.3,
      clothing: totalUsage * 0.2,
      electronics: totalUsage * 0.1,
    }
    return footprints[selectedProduct] || 0
  }, [totalUsage, selectedProduct])

  const predictedUsage = useMemo(() => {
    const lastWeekUsage = waterUsageData.map(day => day.usage)
    const averageUsage = lastWeekUsage.reduce((sum, usage) => sum + usage, 0) / 7
    return Array(7).fill(0).map((_, index) => ({
      day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
      usage: Math.round(averageUsage + (Math.random() - 0.5) * 30) // Add some randomness
    }))
  }, [waterUsageData])

  useEffect(() => {
    const newPoints = Math.floor(waterSaved / 10)
    if (newPoints > points) {
      setPoints(newPoints)
      setShowPointAnimation(true)
      setTimeout(() => setShowPointAnimation(false), 2000)
    }
  }, [waterSaved, points])

  useEffect(() => {
    if (waterSaved >= 100 && !earnedBadges.includes("Water Saver Novice")) {
      setEarnedBadges(prev => [...prev, "Water Saver Novice"])
    }
  }, [waterSaved, earnedBadges])

  const handleUsageInput = (day, value) => {
    const usage = parseInt(value, 10) || 0
    setWaterUsageData(prevData =>
      prevData.map(item =>
        item.day === day ? { ...item, usage } : item
      )
    )
  }

  const startChallenge = (challenge) => {
    setActiveChallenge(challenge)
    // In a real app, you'd start tracking the challenge progress here
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900 dark:to-blue-950 transition-all duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('/water-texture.png')] opacity-10 animate-water-flow" />
      </div>
      <header className="bg-white/80 dark:bg-cyan-900/80 shadow-md border-b border-cyan-100 dark:border-cyan-800 sticky top-0 z-10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Droplet className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
            </motion.div>
            <h1 className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">WaterSaver</h1>
          </div>
          <nav className="flex items-center space-x-4">
            <ul className="flex space-x-4">
              <li><Button variant="ghost" className="text-cyan-800 dark:text-cyan-200 hover:text-cyan-900 hover:bg-cyan-100 dark:hover:bg-cyan-800"><Home className="mr-2 h-4 w-4" />Dashboard</Button></li>
              <li><Button variant="ghost" className="text-cyan-800 dark:text-cyan-200 hover:text-cyan-900 hover:bg-cyan-100 dark:hover:bg-cyan-800"><BarChart2 className="mr-2 h-4 w-4" />Usage</Button></li>
              <li><Button variant="ghost" className="text-cyan-800 dark:text-cyan-200 hover:text-cyan-900 hover:bg-cyan-100 dark:hover:bg-cyan-800"><Award className="mr-2 h-4 w-4" />Leaderboard</Button></li>
              <li><Button variant="ghost" className="text-cyan-800 dark:text-cyan-200 hover:text-cyan-900 hover:bg-cyan-100 dark:hover:bg-cyan-800"><Settings className="mr-2 h-4 w-4" />Settings</Button></li>
            </ul>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="ml-4"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-cyan-900 dark:text-cyan-100">Daily Water Usage</CardTitle>
              <CardDescription className="text-cyan-600 dark:text-cyan-400">Input your water consumption for each day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {waterUsageData.map((day) => (
                  <motion.div
                    key={day.day}
                    className="space-y-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Label htmlFor={`usage-${day.day}`} className="text-cyan-700 dark:text-cyan-300">{day.day}</Label>
                    <Input
                      id={`usage-${day.day}`}
                      type="number"
                      placeholder="0"
                      value={day.usage || ""}
                      onChange={(e) => handleUsageInput(day.day, e.target.value)}
                      className="text-cyan-900 dark:text-cyan-100 bg-cyan-50 dark:bg-cyan-900 border-cyan-200 dark:border-cyan-700 focus:border-cyan-500 dark:focus:border-cyan-300"
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            className="col-span-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700  backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-900 dark:text-cyan-100">Weekly Water Usage</CardTitle>
                <CardDescription className="text-cyan-600 dark:text-cyan-400">Your water consumption this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    usage: {
                      label: "Usage",
                      color: theme === 'dark' ? "hsl(var(--cyan-100))" : "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={waterUsageData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4A5568' : '#E2E8F0'} />
                      <XAxis 
                        dataKey="day" 
                        stroke={theme === 'dark' ? '#E2E8F0' : '#4A5568'}
                        tick={{ fill: theme === 'dark' ? '#E2E8F0' : '#4A5568' }}
                      />
                      <YAxis 
                        stroke={theme === 'dark' ? '#E2E8F0' : '#4A5568'}
                        tick={{ fill: theme === 'dark' ? '#E2E8F0' : '#4A5568' }}
                      />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="usage" fill={theme === 'dark' ? "hsl(var(--cyan-400))" : "var(--color-usage)"}>
                        {waterUsageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={theme === 'dark' ? COLORS[index % COLORS.length] : COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            className="col-span-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-cyan-900 dark:text-cyan-100">Water Usage Breakdown</CardTitle>
                <CardDescription className="text-cyan-600 dark:text-cyan-400">Distribution of your water consumption</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    bathroom: {
                      label: "Bathroom",
                      color: "hsl(var(--chart-1))",
                    },
                    kitchen: {
                      label: "Kitchen",
                      color: "hsl(var(--chart-2))",
                    },
                    laundry: {
                      label: "Laundry",
                      color: "hsl(var(--chart-3))",
                    },
                    other: {
                      label: "Other",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={waterUsageBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {waterUsageBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="white" strokeWidth={2} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-900 dark:text-cyan-100">Usage Statistics</CardTitle>
                <CardDescription className="text-cyan-600 dark:text-cyan-400">Your usage compared to average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Droplet className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Your Average Usage:</span>
                    <span className="ml-auto text-cyan-800 dark:text-cyan-200 font-semibold">{averageUsage} L/day</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-cyan-700 dark:text-cyan-300">Neighbor Average:</span>
                    <span className="ml-auto text-green-800 dark:text-green-200 font-semibold">{neighborAverage} L/day</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200 dark:text-cyan-200 dark:bg-cyan-800">
                          Efficiency
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-cyan-600 dark:text-cyan-200">
                          {Math.round((1 - averageUsage / neighborAverage) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-cyan-200 dark:bg-cyan-800">
                      <motion.div
                        style={{ width: `${Math.min((1 - averageUsage / neighborAverage) * 100, 100)}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500 dark:bg-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((1 - averageUsage / neighborAverage) * 100, 100)}%` }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                  <div className="text-sm text-cyan-700 dark:text-cyan-300">
                    You use {Math.round((averageUsage / neighborAverage) * 100)}% {averageUsage > neighborAverage ? "more" : "less"} water than your neighbors on average.
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-900 dark:text-cyan-100">Weekly Goal Progress</CardTitle>
                <CardDescription className="text-cyan-600 dark:text-cyan-400">Track your water saving goal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-cyan-600 bg-cyan-200 dark:text-cyan-200 dark:bg-cyan-800">
                          Progress
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-cyan-600 dark:text-cyan-200">
                          {Math.round(goalProgress)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-cyan-200 dark:bg-cyan-800">
                      <motion.div
                        style={{ width: `${Math.min(goalProgress, 100)}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-cyan-500 dark:bg-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(goalProgress, 100)}%` }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-cyan-700 dark:text-cyan-300">
                    <span>0 L</span>
                    <span>{weeklyGoal} L</span>
                  </div>
                  <div className="text-center">
                    <motion.span
                      className="text-3xl font-bold text-cyan-800 dark:text-cyan-200"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 1 }}
                    >
                      {Math.round(goalProgress)}%
                    </motion.span>
                    <p className="text-sm text-cyan-600 dark:text-cyan-400">of weekly goal used</p>
                  </div>
                  <p className="text-sm text-center text-cyan-700 dark:text-cyan-300 font-medium">
                    {weeklyUsage < weeklyGoal
                      ? `Great job! You're ${weeklyGoal - weeklyUsage}L under your goal.`
                      : `You've exceeded your goal by ${weeklyUsage - weeklyGoal}L.`}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-900 dark:text-cyan-100">Water Saving Leaderboard</CardTitle>
              <CardDescription className="text-cyan-600 dark:text-cyan-400">See how you rank in your neighborhood</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList className="grid w-full grid-cols-2 bg-cyan-100 dark:bg-cyan-900">
                  <TabsTrigger value="weekly" className="text-cyan-900 dark:text-cyan-100 data-[state=active]:bg-white dark:data-[state=active]:bg-cyan-800">Weekly</TabsTrigger>
                  <TabsTrigger value="monthly" className="text-cyan-900 dark:text-cyan-100 data-[state=active]:bg-white dark:data-[state=active]:bg-cyan-800">Monthly</TabsTrigger>
                </TabsList>
                <TabsContent value="weekly" className="space-y-4">
                  {leaderboardData.map((user, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900 hover:bg-cyan-100 dark:hover:bg-cyan-800 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <span className={`font-medium ${user.name === "You" ? "text-cyan-600 dark:text-cyan-400" : "text-cyan-700 dark:text-cyan-300"}`}>{user.rank}.</span>
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className={user.name === "You" ? "font-semibold text-cyan-800 dark:text-cyan-200" : "text-cyan-700 dark:text-cyan-300"}>{user.name}</span>
                      </div>
                      <Badge variant={user.name === "You" ? "default" : "secondary"}>{user.usage} L</Badge>
                    </motion.div>
                  ))}
                </TabsContent>
                <TabsContent value="monthly">
                  <div className="text-center text-sm text-cyan-700 dark:text-cyan-300 py-4">
                    Monthly data not available yet.
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-900 dark:text-cyan-100">Virtual Water Footprint Calculator</CardTitle>
              <CardDescription className="text-cyan-600 dark:text-cyan-400">Estimate your water footprint based on product category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger id="product-select" className="w-[180px] bg-cyan-50 dark:bg-cyan-900 border-cyan-200 dark:border-cyan-700">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-cyan-800 border-cyan-200 dark:border-cyan-700">
                    <SelectItem value="food" className="text-cyan-900 dark:text-cyan-100">Food</SelectItem>
                    <SelectItem value="clothing" className="text-cyan-900 dark:text-cyan-100">Clothing</SelectItem>
                    <SelectItem value="electronics" className="text-cyan-900 dark:text-cyan-100">Electronics</SelectItem>
                  </SelectContent>
                </Select>
                <motion.span
                  key={selectedProduct}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-cyan-900 dark:text-cyan-100 font-medium"
                >
                  Your virtual water footprint for {selectedProduct} is approximately <span className="font-bold">{Math.round(virtualWaterFootprint)} liters</span>.
                </motion.span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-900 dark:text-cyan-100">
                <Target className="mr-2 h-5 w-5 text-cyan-500" />
                Water-Saving Challenges
              </CardTitle>
              <CardDescription className="text-cyan-600 dark:text-cyan-400">Complete challenges to earn extra points</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {challenges.map((challenge, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between bg-cyan-50 dark:bg-cyan-900 p-3 rounded-md"
                  >
                    <div>
                      <h4 className="font-semibold text-cyan-800 dark:text-cyan-200">{challenge.name}</h4>
                      <p className="text-sm text-cyan-600 dark:text-cyan-400">{challenge.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-green-600 dark:text-green-400 font-semibold">{challenge.points} points</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startChallenge(challenge)}
                        className="ml-2 text-cyan-700 dark:text-cyan-300"
                        disabled={activeChallenge !== null}
                      >
                        {activeChallenge === challenge ? "Active" : "Start"}
                      </Button>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6 }}
        >
          <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-900 dark:text-cyan-100">
                <ShoppingBag className="mr-2 h-5 w-5 text-cyan-500" />
                Water-Saving Device Recommendations
              </CardTitle>
              <CardDescription className="text-cyan-600 dark:text-cyan-400">Invest in these devices to save water</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {waterSavingDevices.map((device, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between bg-cyan-50 dark:bg-cyan-900 p-2 rounded-md"
                  >
                    <span className="text-cyan-800 dark:text-cyan-200">{device.name}</span>
                    <div className="text-right">
                      <span className="text-green-600 dark:text-green-400 font-semibold">{device.savings.toLocaleString()} L/year</span>
                      <span className="text-cyan-600 dark:text-cyan-400 text-sm block">Cost: ${device.cost}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-900 dark:text-cyan-100">
                <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                Water Saving Tips
              </CardTitle>
              <CardDescription className="text-cyan-600 dark:text-cyan-400">Try these tips to reduce your water usage</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <AnimatePresence>
                  {tips.slice(0, showAllTips ? tips.length : 3).map((tip, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start bg-cyan-50 dark:bg-cyan-900 p-2 rounded-md hover:bg-cyan-100 dark:hover:bg-cyan-800 transition-colors"
                    >
                      <TrendingDown className="mr-2 h-4 w-4 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-cyan-800 dark:text-cyan-200">{tip}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <Button
                variant="outline"
                className="w-full mt-4 text-cyan-700 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-900"
                onClick={() => setShowAllTips(!showAllTips)}
              >
                {showAllTips ? (
                  <>
                    Show Less <ChevronUp className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-900 dark:text-cyan-100">
                <Zap className="mr-2 h-5 w-5 text-yellow-500" />
                Water Saver Points
              </CardTitle>
              <CardDescription className="text-cyan-600 dark:text-cyan-400">Earn points for saving water!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <motion.div
                  className="text-4xl font-bold mb-2 text-cyan-800 dark:text-cyan-200"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.2 }}
                >
                  {points}
                </motion.div>
                <p className="text-lg mb-4 text-cyan-700 dark:text-cyan-300">Total Points Earned</p>
                <motion.div
                  className="bg-cyan-50 dark:bg-cyan-900 rounded-lg p-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2.4 }}
                >
                  <p className="text-sm mb-2 text-cyan-700 dark:text-cyan-300">Water Saved This Week</p>
                  <div className="text-3xl font-bold text-green-700 dark:text-green-300">{waterSaved.toFixed(1)} L</div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-900 dark:text-cyan-100">
                <Award className="mr-2 h-5 w-5 text-yellow-500" />
                Badges and Achievements
              </CardTitle>
              <CardDescription className="text-cyan-600 dark:text-cyan-400">Unlock badges by reaching milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge, index) => (
                  <motion.div
                    key={index}
                    className={`p-4 rounded-lg ${earnedBadges.includes(badge.name) ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-800'} text-center`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <h3 className="font-semibold text-cyan-800 dark:text-cyan-200">{badge.name}</h3>
                    <p className="text-sm text-cyan-600 dark:text-cyan-400">{badge.description}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2.4 }}
        >
          <Card className="bg-white/80 dark:bg-cyan-800/80 shadow-lg transition-all duration-300 hover:shadow-xl border border-cyan-100 dark:border-cyan-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-cyan-900 dark:text-cyan-100">
                <Globe className="mr-2 h-5 w-5 text-cyan-500" />
                Water Usage Prediction
              </CardTitle>
              <CardDescription className="text-cyan-600 dark:text-cyan-400">Estimated water usage for the next week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  usage: {
                    label: "Predicted Usage",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictedUsage}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#4A5568' : '#E2E8F0'} />
                    <XAxis 
                      dataKey="day" 
                      stroke={theme === 'dark' ? '#E2E8F0' : '#4A5568'}
                      tick={{ fill: theme === 'dark' ? '#E2E8F0' : '#4A5568' }}
                    />
                    <YAxis 
                      stroke={theme === 'dark' ? '#E2E8F0' : '#4A5568'}
                      tick={{ fill: theme === 'dark' ? '#E2E8F0' : '#4A5568' }}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="usage" 
                      stroke={theme === 'dark' ? '#22D3EE' : '#0EA5E9'} 
                      strokeWidth={2} 
                      dot={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <AnimatePresence>
        {showPointAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 text-cyan-900 px-6 py-3 rounded-full text-2xl font-bold z-50"
          >
            +{Math.floor(waterSaved / 10)} Points!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}