package com.imperial.hotel.auth.controller;

import com.imperial.hotel.auth.dto.LoginRequestDTO;
import com.imperial.hotel.auth.dto.LoginResponseDTO;
import com.imperial.hotel.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    @Operation(
            summary = "Iniciar sesión",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = @Content(
                            schema = @Schema(implementation = LoginRequestDTO.class),
                            examples = {
                                    @ExampleObject(
                                            name = "Credenciales de administrador",
                                            value = """
                                            {
                                              "email": "admin@hotelimperial.com",
                                              "password": "admin123"
                                            }
                                        """
                                    )
                            }
                    )
            )
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Login correcto"),
            @ApiResponse(responseCode = "401", description = "Login incorrecto")
    })
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

}
