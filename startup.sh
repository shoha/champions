if [ ! -d "java" ]; then
  mkdir java
  cd java
  curl https://download.oracle.com/java/18/latest/jdk-18_linux-x64_bin.tar.gz -o jdk-18_linux-x64_bin.tar.gz
  tar zxf jdk-18_linux-x64_bin.tar.gz
  rm jdk-18_linux-x64_bin.tar.gz
fi
