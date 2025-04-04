"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/arrivage/liste")
  }

  return (
    <div className="flex min-h-screen w-full bg-dark p-6">
      <div className="flex w-full lg:flex-row gap-6">
        {/* Left side - Login form */}
        <div className="w-full lg:w-2/5 bg-white rounded-2xl overflow-hidden flex items-center justify-center">
          <div className="flex flex-col justify-center p-8 md:p-10 w-full max-w-md">
            <div className="mx-auto w-full space-y-8">
              <div className="text-center">
                <Image
                  src="https://raw.githubusercontent.com/student726/assets/main/logo-sonasid-orange-black-for-light.svg"
                  alt="Sonasid Logo"
                  width={160}
                  height={80}
                  className="mx-auto mb-8"
                />
                <h2 className="text-2xl font-bold text-foreground">Connexion</h2>
                <p className="mt-2 text-sm text-muted-foreground">Sonasid XXX-XXX</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m.smith@sonasid.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-xl py-8"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Button variant="link" className="text-primary p-0 h-auto">
                      Mot de passe oublié?
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="rounded-xl py-8"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal">
                    Se souvenir de moi
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 rounded-xl py-8">
                  Se connecter
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  Vous n'avez pas de compte?{" "}
                  <Button variant="link" className="text-primary p-0 h-auto">
                    Créer un compte
                  </Button>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Right side - Background image */}
        <div className="hidden lg:block lg:w-3/5 rounded-2xl overflow-hidden relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://raw.githubusercontent.com/student726/assets/main/sonasid-cover.png')",
              zIndex: 1,
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
            style={{ zIndex: 2 }}
          />
          <div
            className="relative h-full flex flex-col items-center justify-center text-center p-8"
            style={{ zIndex: 3 }}
          >
            <h1 className="text-4xl font-bold text-white uppercase">
              BIENVENUE
              <br />
              SUR VOTRE PLATEFORME
              <br />
              XXX-XXX
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}

