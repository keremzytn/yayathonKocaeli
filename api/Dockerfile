# Use the official .NET 9.0 SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore as distinct layers
COPY ["Api.csproj", "./"]
RUN dotnet restore "Api.csproj"

# Copy everything else and build the app
COPY . .
RUN dotnet publish "Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Use the official .NET 9.0 ASP.NET runtime image for the final stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

# Define a non-root user (optional but recommended for security)
USER $APP_UID

COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "Api.dll"]
