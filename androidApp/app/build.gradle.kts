plugins {
    alias(libs.plugins.androidApplication)
    alias(libs.plugins.jetbrainsKotlinAndroid)
}

android {
    namespace = "com.example.androidapp"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.example.androidapp"
        minSdk = 24
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {

    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.material)
    implementation(libs.androidx.activity)
    implementation(libs.androidx.constraintlayout)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)

    implementation("com.android.volley:volley:1.2.1")

    implementation ("com.google.mlkit:barcode-scanning:17.0.0")

    implementation ("androidx.compose.ui:ui:1.0.5")

    implementation ("androidx.compose.material:material:1.0.5")

    implementation ("androidx.compose.ui:ui-tooling:1.0.5")

    implementation ("androidx.lifecycle:lifecycle-runtime-ktx:2.3.1")

    implementation ("androidx.activity:activity-compose:1.3.1")

    implementation ("com.journeyapps:zxing-android-embedded:4.3.0")

    implementation ("com.google.firebase:firebase-messaging:23.1.1")

    implementation ("com.google.zxing:core:3.5.0")

    implementation ("com.android.support:support-compat:28.0.0")


}