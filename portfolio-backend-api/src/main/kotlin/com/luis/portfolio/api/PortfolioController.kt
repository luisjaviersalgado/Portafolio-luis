package com.luis.portfolio.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

data class ProfileResponse(
    val name: String,
    val role: String,
    val summary: String,
    val location: String,
    val email: String,
    val phone: String,
    val linkedin: String,
    val github: String
)

data class ProjectResponse(
    val title: String,
    val type: String,
    val description: String,
    val stack: List<String>
)

data class ContactResponse(
    val email: String,
    val whatsapp: String,
    val linkedin: String,
    val message: String
)

@RestController
@RequestMapping("/api")
class PortfolioController {

    @GetMapping("/profile")
    fun profile() = ProfileResponse(
        name = "Luis Javier Salgado",
        role = "Full Stack Developer",
        summary = "Desarrollador enfocado en frontend moderno, APIs REST y soluciones web funcionales.",
        location = "Colombia",
        email = "luisjaviersalgadoguzman@gmail.com",
        phone = "+57 310 568 9138",
        linkedin = "luis-salgado-guzman-desarrollo-full-stack-java",
        github = "luisjaviersalgado"
    )

    @GetMapping("/projects")
    fun projects() = listOf(
        ProjectResponse("Orígenes Colombia", "Fullstack", "E-commerce cultural con catálogo y experiencia visual moderna.", listOf("Java", "Spring Boot", "JavaScript", "PostgreSQL")),
        ProjectResponse("Mini Tienda", "Frontend", "Carrito de compras con cálculo de totales e interacción dinámica.", listOf("HTML5", "CSS3", "JavaScript")),
        ProjectResponse("Hackathon Project", "UI / Challenge", "Solución colaborativa construida en equipo durante hackathon.", listOf("HTML5", "CSS3", "JavaScript", "GitHub")),
        ProjectResponse("Portfolio Backend API", "Backend", "API REST base para alimentar el portafolio profesional.", listOf("Kotlin", "Spring Boot", "REST API")),
        ProjectResponse("Terminal Portfolio", "Frontend", "Experiencia interactiva tipo terminal para visitantes.", listOf("React", "TypeScript", "Framer Motion"))
    )

    @GetMapping("/technologies")
    fun technologies() = listOf("React", "TypeScript", "Kotlin", "Java", "Spring Boot", "PostgreSQL", "Git", "GitHub", "Figma")

    @GetMapping("/contact")
    fun contact() = ContactResponse(
        email = "luisjaviersalgadoguzman@gmail.com",
        whatsapp = "+57 310 568 9138",
        linkedin = "luis-salgado-guzman-desarrollo-full-stack-java",
        message = "Disponible para proyectos Frontend, Backend y Full Stack."
    )
}
