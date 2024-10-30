# Source files
src_files = files(
    'main.cpp',
    'HTTPController.cpp',
    'APIHandler.cpp',
    'CoordinateCalculator.cpp'
)

# Create executable
executable('Rainfinder', src_files, include_directories: inc, dependencies: [dependency('boost'), dependency('openssl')])