import Image from "next/image"

interface LogoProps {
  collapsed?: boolean
  className?: string
}

export function Logo({ collapsed = false, className }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {collapsed ? (
        <Image
          src="https://raw.githubusercontent.com/student726/assets/main/logo-sonasid-mini.svg"
          alt="SONASID Logo"
          width={40}
          height={40}
          className="h-8 w-auto"
        />
      ) : (
        <Image
          src="https://raw.githubusercontent.com/student726/assets/main/logo-sonasid-orange-white-for-dark.svg"
          alt="SONASID Logo"
          width={140}
          height={40}
          className="h-8 w-auto"
        />
      )}
    </div>
  )
}

